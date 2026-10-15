export const links = {
  site: 'https://www.amigosdamesa.site/',
  regulamento: 'https://www.amigosdamesa.site/regulamento',
  areaDoTrader: 'https://comunidade-amigosdamesa.online/auth/login?redirect=%2F',
  instagram: 'https://www.instagram.com/amigosdamesa/',
  /**
   * Checkout do Clube do Valor informado no briefing.
   * PENDENTE: confirmar se as condições (R$ 197,00/mês) correspondem ao checkout.
   */
  clubeCheckout: 'https://checkout.amigosdamesas.store/subscribe/clube-do-valor-checkout3',
  clubeCheckoutConfirmed: false,
}

/**
 * Mapa explícito planId -> URL oficial de checkout.
 * PENDENTE: nenhum link de plano foi confirmado. Enquanto vazio, o CTA de
 * compra permanece desativado e sinalizado como pendente.
 */
export const planCheckoutUrls: Record<string, string> = {}
