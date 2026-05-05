import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'
import twilio from 'twilio'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const tw = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const SYSTEM_PROMPT = `You are a friendly assistant for a local trade business.
Collect 3 things in order, one question at a time:
1. What service do they need? (e.g. boiler repair, leaking pipe)
2. What is their full address?
3. How urgent is it? (today, this week, just getting a quote)
After all 3 are collected, say exactly:
"Perfect, I have everything I need! Someone will call you back shortly."
Keep replies short — max 2 sentences. Be warm and friendly.`

export default async function handler(req, res) {
  try {
    const { From: phone, Body: userMsg } = req.body

    // 1. Load existing conversation (or start fresh)
    let { data: convo } = await supabase
      .from('conversations')
      .select('*')
      .eq('phone', phone)
      .maybeSingle()

    const history = convo?.messages || []
    history.push({ role: 'user', content: userMsg })

    // 2. Get AI reply from Groq
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history
      ],
      max_tokens: 150
    })
    const aiReply = completion.choices[0].message.content
    history.push({ role: 'assistant', content: aiReply })

    // 3. Save conversation to Supabase
    await supabase.from('conversations').upsert(
      { phone, messages: history, updated_at: new Date().toISOString() },
      { onConflict: 'phone' }
    )

    // 4. If conversation is done — save lead + alert owner
    const isDone = aiReply.includes('Someone will call you back')
    if (isDone) {
      await supabase.from('leads').insert({
        caller_phone: phone,
        conversation: history,
        status: 'new'
      })
      await tw.messages.create({
        from: process.env.TWILIO_NUMBER,
        to:   process.env.OWNER_PHONE,
        body: `🔔 New lead!\nPhone: ${phone}\nChat: ${history
          .filter(m => m.role === 'user')
          .map(m => m.content)
          .join(' | ')}`
      })
    }

    // 5. Reply to the SMS caller via TwiML
    res.setHeader('Content-Type', 'text/xml')
    res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response><Message>${aiReply}</Message></Response>`
    )

  } catch (err) {
    console.error(err)
    res.status(500).send('Error')
  }
}
