import axios, { AxiosPromise } from 'axios'
import { toast } from 'react-toastify'

type RequestHandlerOptions = {
  success?: string
}

type RequestHandlerResult<T> = {
  data: T | null
  errors: boolean
}

const errorMessages: Record<number, string> = {
  400: 'Requisição inválida. Verifique os dados enviados.',
  401: 'Não autorizado. Faça login novamente.',
  403: 'Acesso negado.',
  404: 'Recurso não encontrado.',
  409: 'Conflito. O recurso já existe.',
  422: 'Dados inválidos. Verifique as informações.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
  503: 'Serviço indisponível. Tente novamente mais tarde.',
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }

    const status = error.response?.status

    if (status && status in errorMessages) {
      if(errorMessages[status]) {
        return errorMessages[status]
      }
    }

    return 'Erro ao processar requisição. Tente novamente.'
  }

  return 'Erro inesperado. Tente novamente.'
}

export async function requestHandler<T>(
  request: () => AxiosPromise<T>,
  options?: RequestHandlerOptions
): Promise<RequestHandlerResult<T>> {
  try {
    const response = await request()
    const data = response.data

    if (options?.success) {
      toast.success(options.success)
    }

    return {
      data,
      errors: false,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)

    return {
      data: null,
      errors: true,
    }
  }
}
