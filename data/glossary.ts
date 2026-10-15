export const glossary = {
  meta: 'Meta de aprovação: resultado líquido que o trader precisa atingir no exame, respeitando as regras do plano.',
  stop: 'Stop Global: perda acumulada máxima permitida no plano. Atingir o stop encerra a avaliação.',
  sr: 'SR — Simulador Remunerado: fase após aprovação em que resultados, sob critérios, podem ser elegíveis a repasse.',
  cr: 'CR — Conta Real: fase em que o trader opera com capital da mesa, conforme critérios de progressão do plano.',
  meiaMeta: 'Meia Meta: condição anunciada no plano relacionada à meta de aprovação. Detalhes no regulamento.',
  take: 'Take: ganho realizado. "Sem take para ativar saque" indica que não é exigido um ganho mínimo específico para liberar a solicitação, conforme regulamento.',
  repasse: 'Repasse: parcela do resultado líquido elegível transferida ao trader, conforme modalidade, ciclo e deduções do regulamento.',
  exame: 'Exame: avaliação em ambiente simulado, com meta e stop específicos do plano.',
} as const

export type GlossaryKey = keyof typeof glossary
