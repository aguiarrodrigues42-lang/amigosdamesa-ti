/**
 * Catálogo — 31 registros, 7 categorias.
 * Fonte: data/catalogo-31-planos.source.json (prints + landing page, 15/10/2026).
 * Valores em CENTAVOS (BRL). NÃO são preços Black Week aprovados.
 * - baseOfferPriceCents: valor exibido atualmente (preço-base do catálogo).
 * - referencePriceCents: valor riscado da captura. NÃO é total parcelado.
 * - null = não informado / indisponível. Nunca renderizar como R$ 0,00.
 */
import type { CategoryInfo, Plan } from "./types"

export const categories: CategoryInfo[] = [
  { slug: "exames", label: "Exames", subtitle: "Avaliação em ambiente simulado com meta e stop definidos." },
  { slug: "prime-plus", label: "Prime Plus", subtitle: "Assinatura mensal de avaliação, com taxa única após aprovação." },
  { slug: "titan", label: "Titan", subtitle: "Exame com alto volume de contratos para trader com gestão madura." },
  { slug: "exclusive", label: "Exclusive", subtitle: "Edição limitada da linha Pegue e Monte, com SKU e preço próprios." },
  { slug: "senior", label: "Sênior", subtitle: "Entrada direta no Simulador Remunerado, segundo regras específicas." },
  { slug: "pegue-e-monte", label: "Pegue e Monte", subtitle: "Exame com meia meta e sem limite diário na fase de avaliação." },
  { slug: "bit", label: "BIT", subtitle: "Modalidade com Bitcoin, WIN e WDO conforme regras do plano." },
]

export const plans: Plan[] = [
  {
    "id": "exames--plano-iniciante",
    "category": "exames",
    "name": "Plano Iniciante",
    "contracts": 7,
    "metaCents": 80000,
    "stopGlobalCents": 200000,
    "baseOfferPriceCents": 25566,
    "referencePriceCents": 133140,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "exames--plano-intermediario",
    "category": "exames",
    "name": "Plano Intermediário",
    "contracts": 15,
    "metaCents": 140000,
    "stopGlobalCents": 250000,
    "baseOfferPriceCents": 33470,
    "referencePriceCents": 179340,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "WIN / WDO",
    "featured": true,
    "reviewFlags": []
  },
  {
    "id": "exames--plano-avancado",
    "category": "exames",
    "name": "Plano Avançado",
    "contracts": 25,
    "metaCents": 395000,
    "stopGlobalCents": 425000,
    "baseOfferPriceCents": 53500,
    "referencePriceCents": 249875,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "exames--plano-uno-40-indice",
    "category": "exames",
    "name": "Plano UNO 40 · Índice",
    "contracts": 40,
    "metaCents": 498000,
    "stopGlobalCents": 625000,
    "baseOfferPriceCents": 99900,
    "referencePriceCents": 298875,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "Índice",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "exames--plano-uno-40-dolar",
    "category": "exames",
    "name": "Plano UNO 40 · Dólar",
    "contracts": 40,
    "metaCents": 498000,
    "stopGlobalCents": 625000,
    "baseOfferPriceCents": 99900,
    "referencePriceCents": 298875,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "Dólar",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "exames--plano-master",
    "category": "exames",
    "name": "Plano Master",
    "contracts": 50,
    "metaCents": 995000,
    "stopGlobalCents": 1025000,
    "baseOfferPriceCents": 123000,
    "referencePriceCents": 474723,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque"
    ],
    "afterApprovalCents": null,
    "asset": "Índice e Dólar",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "prime-plus--prime-plus-6",
    "category": "prime-plus",
    "name": "Prime Plus 6",
    "contracts": 6,
    "metaCents": 180000,
    "stopGlobalCents": 250000,
    "baseOfferPriceCents": 18000,
    "referencePriceCents": null,
    "billing": "monthly",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem dias mínimos para aprovação",
      "Sem stop diário"
    ],
    "afterApprovalCents": {
      "profitOne": 30000,
      "profitPro": 35000
    },
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "prime-plus--prime-plus-11",
    "category": "prime-plus",
    "name": "Prime Plus 11",
    "contracts": 11,
    "metaCents": 400000,
    "stopGlobalCents": 350000,
    "baseOfferPriceCents": 18000,
    "referencePriceCents": null,
    "billing": "monthly",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem dias mínimos para aprovação",
      "Sem stop diário"
    ],
    "afterApprovalCents": {
      "profitOne": 72000,
      "profitPro": 78000
    },
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "prime-plus--prime-plus-16",
    "category": "prime-plus",
    "name": "Prime Plus 16",
    "contracts": 16,
    "metaCents": 750000,
    "stopGlobalCents": 600000,
    "baseOfferPriceCents": 18000,
    "referencePriceCents": null,
    "billing": "monthly",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem dias mínimos para aprovação",
      "Sem stop diário"
    ],
    "afterApprovalCents": {
      "profitOne": 122000,
      "profitPro": 132000
    },
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "prime-plus--prime-plus-21",
    "category": "prime-plus",
    "name": "Prime Plus 21",
    "contracts": 21,
    "metaCents": 1000000,
    "stopGlobalCents": 900000,
    "baseOfferPriceCents": 18000,
    "referencePriceCents": null,
    "billing": "monthly",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem dias mínimos para aprovação",
      "Sem stop diário"
    ],
    "afterApprovalCents": {
      "profitOne": 172000,
      "profitPro": 185000
    },
    "asset": "WIN / WDO",
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "titan--titan-pro-10",
    "category": "titan",
    "name": "Titan Pro 10",
    "contracts": 30,
    "metaCents": 500000,
    "stopGlobalCents": 500000,
    "baseOfferPriceCents": 78660,
    "referencePriceCents": 262200,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Condições \"Sem limite diário\" e \"Sem mínimo de dias\" a validar versus regulamento."
    ]
  },
  {
    "id": "titan--titan-pro-20",
    "category": "titan",
    "name": "Titan Pro 20",
    "contracts": 45,
    "metaCents": 800000,
    "stopGlobalCents": 800000,
    "baseOfferPriceCents": 119239,
    "referencePriceCents": 397463,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Condições \"Sem limite diário\" e \"Sem mínimo de dias\" a validar versus regulamento."
    ]
  },
  {
    "id": "titan--titan-pro-30",
    "category": "titan",
    "name": "Titan Pro 30",
    "contracts": 65,
    "metaCents": 1400000,
    "stopGlobalCents": 1400000,
    "baseOfferPriceCents": null,
    "referencePriceCents": 530800,
    "billing": "once",
    "status": "unavailable",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Condições \"Sem limite diário\" e \"Sem mínimo de dias\" a validar versus regulamento."
    ]
  },
  {
    "id": "titan--titan-pro-50",
    "category": "titan",
    "name": "Titan Pro 50",
    "contracts": 80,
    "metaCents": 1000000,
    "stopGlobalCents": 1000000,
    "baseOfferPriceCents": null,
    "referencePriceCents": 664133,
    "billing": "once",
    "status": "unavailable",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Condições \"Sem limite diário\" e \"Sem mínimo de dias\" a validar versus regulamento.",
      "Stop Global (R$ 10.000) menor que o do Titan Pro 30 — mantido conforme captura, aguardando validação humana."
    ]
  },
  {
    "id": "exclusive--pegue-e-monte-12-exclusive",
    "category": "exclusive",
    "name": "Pegue e Monte 12 · Exclusive",
    "contracts": 12,
    "metaCents": 192000,
    "stopGlobalCents": 350000,
    "baseOfferPriceCents": 92936,
    "referencePriceCents": 464680,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Edição limitada",
      "Sem limite diário para o exame"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "exclusive--pegue-e-monte-20-exclusive",
    "category": "exclusive",
    "name": "Pegue e Monte 20 · Exclusive",
    "contracts": 20,
    "metaCents": 283200,
    "stopGlobalCents": 472000,
    "baseOfferPriceCents": 132000,
    "referencePriceCents": 660000,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Edição limitada",
      "Sem limite diário para o exame"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--iniciante-7",
    "category": "senior",
    "name": "Iniciante 7",
    "contracts": 7,
    "metaCents": null,
    "stopGlobalCents": 200000,
    "baseOfferPriceCents": 63766,
    "referencePriceCents": 531383,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--intermediario-15",
    "category": "senior",
    "name": "Intermediário 15",
    "contracts": 15,
    "metaCents": null,
    "stopGlobalCents": 250000,
    "baseOfferPriceCents": 79922,
    "referencePriceCents": 666013,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--avancado-25",
    "category": "senior",
    "name": "Avançado 25",
    "contracts": 25,
    "metaCents": null,
    "stopGlobalCents": 425000,
    "baseOfferPriceCents": 119902,
    "referencePriceCents": 599510,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--uno-40-indice",
    "category": "senior",
    "name": "UNO 40 · Índice",
    "contracts": 40,
    "metaCents": null,
    "stopGlobalCents": 625000,
    "baseOfferPriceCents": 341964,
    "referencePriceCents": 759920,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--uno-40-dolar",
    "category": "senior",
    "name": "UNO 40 · Dólar",
    "contracts": 40,
    "metaCents": null,
    "stopGlobalCents": 625000,
    "baseOfferPriceCents": 341964,
    "referencePriceCents": 759920,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "senior--master-50",
    "category": "senior",
    "name": "Master 50",
    "contracts": 50,
    "metaCents": null,
    "stopGlobalCents": 1025000,
    "baseOfferPriceCents": 418398,
    "referencePriceCents": 929773,
    "billing": "once",
    "status": "available",
    "notes": [
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Direto no Simulador Remunerado",
      "Entrada direta para trader experiente"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "pegue-e-monte--pegue-e-monte-8",
    "category": "pegue-e-monte",
    "name": "Pegue e Monte 8",
    "contracts": 8,
    "metaCents": 150000,
    "stopGlobalCents": 250000,
    "baseOfferPriceCents": 37976,
    "referencePriceCents": 237342,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "pegue-e-monte--pegue-e-monte-12",
    "category": "pegue-e-monte",
    "name": "Pegue e Monte 12",
    "contracts": 12,
    "metaCents": 192000,
    "stopGlobalCents": 350000,
    "baseOfferPriceCents": 42348,
    "referencePriceCents": 264680,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": true,
    "reviewFlags": []
  },
  {
    "id": "pegue-e-monte--pegue-e-monte-20",
    "category": "pegue-e-monte",
    "name": "Pegue e Monte 20",
    "contracts": 20,
    "metaCents": 283200,
    "stopGlobalCents": 472000,
    "baseOfferPriceCents": 72000,
    "referencePriceCents": 360000,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": []
  },
  {
    "id": "pegue-e-monte--pegue-e-monte-27",
    "category": "pegue-e-monte",
    "name": "Pegue e Monte 27",
    "contracts": 27,
    "metaCents": 361200,
    "stopGlobalCents": 602000,
    "baseOfferPriceCents": null,
    "referencePriceCents": 169050,
    "billing": "once",
    "status": "unavailable",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Redação \"Sem mínimo de dias operados\" a validar no regulamento."
    ]
  },
  {
    "id": "pegue-e-monte--pegue-e-monte-32",
    "category": "pegue-e-monte",
    "name": "Pegue e Monte 32",
    "contracts": 32,
    "metaCents": 489000,
    "stopGlobalCents": 815000,
    "baseOfferPriceCents": null,
    "referencePriceCents": 212060,
    "billing": "once",
    "status": "unavailable",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Sem limite diário para o exame",
      "Sem mínimo de dias operados para aprovação"
    ],
    "afterApprovalCents": null,
    "asset": null,
    "featured": false,
    "reviewFlags": [
      "Redação \"Sem mínimo de dias operados\" a validar no regulamento."
    ]
  },
  {
    "id": "bit--bit-ultra-10",
    "category": "bit",
    "name": "BIT Ultra 10",
    "contracts": null,
    "metaCents": 90000,
    "stopGlobalCents": 195000,
    "baseOfferPriceCents": 32131,
    "referencePriceCents": null,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Profit ONE"
    ],
    "afterApprovalCents": null,
    "asset": "Bitcoin / WIN / WDO",
    "featured": false,
    "reviewFlags": [
      "Quantidade de contratos não confirmada no cartão — o número no nome não equivale a limite operacional."
    ]
  },
  {
    "id": "bit--bit-ultra-15",
    "category": "bit",
    "name": "BIT Ultra 15",
    "contracts": null,
    "metaCents": 250000,
    "stopGlobalCents": 351000,
    "baseOfferPriceCents": 46086,
    "referencePriceCents": null,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Profit ONE"
    ],
    "afterApprovalCents": null,
    "asset": "Bitcoin / WIN / WDO",
    "featured": false,
    "reviewFlags": [
      "Quantidade de contratos não confirmada no cartão — o número no nome não equivale a limite operacional."
    ]
  },
  {
    "id": "bit--bit-ultra-20",
    "category": "bit",
    "name": "BIT Ultra 20",
    "contracts": null,
    "metaCents": 350000,
    "stopGlobalCents": 590000,
    "baseOfferPriceCents": 83840,
    "referencePriceCents": null,
    "billing": "once",
    "status": "available",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Profit ONE"
    ],
    "afterApprovalCents": null,
    "asset": "Bitcoin / WIN / WDO",
    "featured": false,
    "reviewFlags": [
      "Quantidade de contratos não confirmada no cartão — o número no nome não equivale a limite operacional."
    ]
  },
  {
    "id": "bit--bit-ultra-30",
    "category": "bit",
    "name": "BIT Ultra 30",
    "contracts": null,
    "metaCents": 550000,
    "stopGlobalCents": 715000,
    "baseOfferPriceCents": null,
    "referencePriceCents": null,
    "billing": "once",
    "status": "unavailable",
    "notes": [
      "Meia meta",
      "Ingresso Arena",
      "90% saque",
      "Sem take para ativar saque",
      "Profit ONE"
    ],
    "afterApprovalCents": null,
    "asset": "Bitcoin / WIN / WDO",
    "featured": false,
    "reviewFlags": [
      "Quantidade de contratos não confirmada no cartão — o número no nome não equivale a limite operacional."
    ]
  }
]
