import Image from 'next/image'
import { cookies } from 'next/headers'
import { getServerUser } from '@/lib/payload-utils'
import { getPayloadClient } from '@/getPayload'
import { notFound, redirect } from 'next/navigation'
import { Category, Product, User, ProductFile } from "../../payload-types"
import { format } from 'path'
import { formatPrice } from '@/lib/utils'
import { productQueryValidator } from '@/lib/validators/product-query-validator'
import Link from 'next/link'
import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
    const orderId = searchParams.orderId
    const nextCookies = cookies()

    const { user } = await getServerUser(nextCookies)
    const payload = await getPayloadClient()

    const { docs: orders } = await payload.find({
        collection: "orders",
        depth: 2,
        where: {
            id: {
                equals: orderId,
            },
        },
    })

    const [order] = orders

    if (!order) { return notFound() }

    const orderUserId =
        typeof order.user === 'string'
            ? order.user
            : order.user.id

    if (orderUserId !== user?.id) {   //no autorizado
        return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
    }

    const products = order.products as Product[]

    const orderTotal = products.reduce((total, product) => {
        return total + product.price
    }, 0)

    return (
        <main className="relative lg:min-h-full">

            <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
                <Image fill
                    src='/thank-you.png'
                    className='h-full w-full object-cover object-center'
                    alt='Thank you for your Order :)' />
            </div>

            <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24'>
                <div className='lg:col-start-2'>
                    <p className='text-sm font-medium text-blue-600'>
                        Orden Completada
                    </p>
                    <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                        Gracias por su Compra :3
                    </h1>
                    {order._isPaid ? <p className='mt-2 text-base text-muted-foreground'>
                        Su orden ha sido exitosa y puede descargar el adelanto de su manga. Le enviamos un correo con los detalles a 
                        {typeof order.user !== 'string' ? (
                        <span className='font-medium text-gray-900'>
                            {order.user.email}
                        </span>
                        ) : null}
                        .
                    </p> : (<p className='mt-2 text-base text-muted-foreground'>
                        Estamos procesando su orden en este momento. Le enviaremos una confirmacion en breve.
                    </p>
                    )}
                    <div className='mt-10 text-sm font-medium'>
                        <div className='text-muted-foreground'>
                            Order No.
                        </div>
                        <div className='mt-2 text-gray-900'>
                            {order.id}
                        </div>

                        <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                            {(order.products as Product[]).map((product) => {
                                const [category] = product.category as Category[]
                                const label = category.name //label del producto

                                const downloadUrl = (product.product_files as ProductFile).url as string
                                const { image } = product.images[0]
                                return (<li key={product.id} className='flex space-x-6 py-6'>
                                    <div className='relative h-24 w-24'>
                                        {typeof image !== "string" && image.url ? (
                                            <Image
                                                fill
                                                src={image.url}
                                                alt={`${product.name} image`}
                                                className='flex-none rounded-md bg-gray-100 object-cover object-center' />
                                        ) : null}
                                    </div>
                                    <div className='flex-auto flex flex-col justify-between'>
                                        <div className='space-y-1'>
                                            <h3 className='text-gray-900'>
                                                {/* nombre */}
                                                {product.name}
                                            </h3>

                                            <p className='my-1'>
                                                Categoria: {label}
                                            </p>
                                        </div>
                                        {/* descargar imgs*/}
                                        {order._isPaid ? (
                                            <a href={downloadUrl}
                                                download={product.name}
                                                className='text-blue-600 hover:underline-offset-2'>
                                                Descargar Adelanto.
                                            </a>
                                        ) : null}
                                    </div>
                                    <p className='flex-none font-medium text-gray-900'>
                                        {formatPrice(product.price)}
                                    </p>
                                </li>
                                )
                            })}
                        </ul>

                        <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                            <div className='flex justify-between'>
                                <p>Subtotal</p>
                                <p className='text-gray-900'>{formatPrice(orderTotal)}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p>Envio</p>
                                <p className='text-gray-900'>Gratis</p>
                            </div>

                            <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                                <p className='text-base'>Total</p>
                                <p className='text-base'> {formatPrice(orderTotal)}</p>
                            </div>
                        </div>

                        <PaymentStatus
                            isPaid={order._isPaid}
                            orderEmail={(order.user as User).email}
                            orderId={order.id} 
                        />

                        <div className='mt-10 border-t border-gray-200 py-6 text-right'>
                            <Link href='/products' className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                                Continuar comprando &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        </main>
    )
}

export default ThankYouPage