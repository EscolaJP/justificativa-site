export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const resposta = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        token: process.env.TOKEN_API,
        data: JSON.stringify(req.body)
      })
    });

    const json = await resposta.json();
    return res.status(200).json(json);

  } catch (erro) {
    return res.status(500).json({
      status: "erro",
      mensagem: "Falha no servidor"
    });
  }
}
