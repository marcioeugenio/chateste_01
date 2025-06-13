export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { message } = req.body;

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const dados = await resposta.json();
    const reply = dados.choices?.[0]?.message?.content || "Desculpe, não entendi.";

    res.status(200).json({ reply });
  } catch (erro) {
    res.status(500).json({ error: 'Erro ao gerar resposta' });
  }
}
