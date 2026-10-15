export type FaqItem = { q: string; a: string; pendingReview?: string }

export const faq: FaqItem[] = [
  {
    q: 'Quais mercados estão disponíveis para operar na Amigos da Mesa?',
    a: 'Mini Dólar (WDO), Mini Índice (WIN) e Bitcoin, conforme o plano contratado e os limites de cada modalidade.',
  },
  {
    q: 'A Amigos da Mesa trabalha com drawdown?',
    a: 'Não utilizamos drawdown como critério de avaliação. Valem os limites diários e globais aplicáveis a cada plano e fase, conforme o regulamento.',
  },
  {
    q: 'Posso usar minha própria estratégia?',
    a: 'Sim, dentro das regras da fase e do regulamento. Atenção: o regulamento restringe micro-scalping e outros tipos de operação. Consulte a lista completa antes de operar.',
  },
  {
    q: 'Quais plataformas posso utilizar?',
    a: 'Profit ONE, Plus ou PRO, conforme disponibilidade e condições do plano. O regulamento prevê cobrança de licença da plataforma (referência: Profit ONE R$ 115,00 e Profit PRO R$ 245,00, sujeitos a confirmação vigente).',
    pendingReview:
      'FAQ do site menciona 30 dias iniciais gratuitos da Profit ONE; regulamento prevê cobrança. Validar antes de prometer isenção.',
  },
  {
    q: 'Existe prazo para marcar o exame?',
    a: 'Segundo o regulamento, o exame inicia automaticamente no dia seguinte à compra, com opção de agendar uma data diferente na área logada dentro de 60 dias.',
    pendingReview: 'Redação final a confirmar — FAQ e regulamento divergem.',
  },
  {
    q: 'Quais fatores levam à desclassificação do trader?',
    a: 'Violação de regras da modalidade, atingir o stop diário ou global aplicável e realizar operações proibidas. A documentação de cada modalidade detalha os critérios.',
  },
  {
    q: 'Quantas tentativas de avaliação estão incluídas?',
    a: 'Uma avaliação por contratação. Novas tentativas exigem nova contratação. É possível manter até dez planos/contas ativos, conforme as regras.',
  },
]
