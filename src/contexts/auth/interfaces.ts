export type PhantomAccount = {
  address: string
  publicKey: string
  addressType: string
  purpose: 'payment' | 'ordinals'
}
