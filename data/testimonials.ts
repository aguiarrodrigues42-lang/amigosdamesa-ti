export type Testimonial = {
  quote: string
  name: string
  context: string
  /** Foto real autorizada — preencher apenas com asset aprovado. */
  imageSrc?: string
  /** false até o negócio confirmar autorização de uso. */
  verified: boolean
}

/** Relatos presentes no site original. Não são testemunhos financeiros verificados. */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Antes da mesa, eu operava no escuro. Perdia mais do que ganhava. Hoje finalmente estou consistente.',
    name: 'Ricardo M.',
    context: 'Trader há 2 anos',
    verified: false,
  },
  {
    quote:
      'A comunidade fez toda a diferença. Operar sozinha era muito difícil. Agora tenho suporte e meus resultados melhoraram.',
    name: 'Carolina S.',
    context: 'Trader há 8 meses',
    verified: false,
  },
  {
    quote:
      'Já fiz vários cursos e nenhum me deu o que a mesa dá: acompanhamento real e operações ao vivo.',
    name: 'Fernando L.',
    context: 'Trader há 3 anos',
    verified: false,
  },
]
