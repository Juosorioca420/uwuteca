"use client"

interface PaymentStatusProps {
    orderEmail: string
    orderId: string
    isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
    return <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
         <div>
            <p className="font-medium text-gray-900">
                Envio a
            </p>
            <p>{orderEmail}</p>
         </div>

         <div>
            <p className="font-medium text-gray-900">
                Estado de la orden
            </p>
            <p>
                {isPaid ? "pagado correctamente" : "pendiente de pago"}
            </p>
         </div>
    </div>
}


export default PaymentStatus