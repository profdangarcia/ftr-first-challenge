import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { linkService } from '@/services/api'

const newLinkFormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'O link original é obrigatório')
    .url('Formato de URL inválido'),
  shortCode: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true
        // Permite apenas letras, números, hífens e underscores
        return /^[a-zA-Z0-9_-]+$/.test(value)
      },
      {
        message: 'O link encurtado pode conter apenas letras, números, hífens e underscores',
      }
    ),
})

type NewLinkFormData = z.infer<typeof newLinkFormSchema>

export function NewLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkFormSchema),
    mode: 'onBlur',
  })

  const originalUrl = watch('originalUrl')
  const hasErrors = Object.keys(errors).length > 0
  const isDisabled = !originalUrl || hasErrors || isSubmitting

  async function onSubmit(data: NewLinkFormData) {
    const requestData: { originalUrl: string; shortCode?: string } = {
      originalUrl: data.originalUrl,
    }

    if (data.shortCode && data.shortCode.trim()) {
      requestData.shortCode = data.shortCode.trim()
    }

    const result = await linkService.create(requestData)

    if (!result.errors) {
      reset()
    }
  }

  return (
    <section className="bg-gray-100 rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold text-gray-600 mb-6">Novo link</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="LINK ORIGINAL"
          placeholder="www.exemplo.com.br"
          error={errors.originalUrl?.message}
          {...register('originalUrl')}
        />

        <Input
          label="LINK ENCURTADO"
          placeholder="brev.ly/"
          error={errors.shortCode?.message}
          {...register('shortCode')}
        />

        <Button type="submit" disabled={isDisabled} className="w-full">
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </Button>
      </form>
    </section>
  )
}
