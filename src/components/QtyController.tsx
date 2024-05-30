import { trpc } from "../trpc/client";
import { CartItem, useCart } from "../hooks/use-cart";
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2, Minus, Plus } from "lucide-react";

interface Props {
    item: CartItem;
}

const QuantityController = ({ item }: Props) => {

    const { mutate: updateQty, isLoading, isError, data } = trpc.auth.updateQty.useMutation({
        onSuccess: (data) => { 
            // if (data.new_qty > 0){
            //     item.qty = (item.qty ?? 0) + 1;
            // }
        },
        onError: (e) => {
            if (e.data?.code === 'BAD_REQUEST'){
                toast.error(`No quedan unidades de ${item.product.name} disponibles.`)
            }
        }
    })
    // useEffect(() => {
    //     updateQty( { id: item.product.id.toString(), new_qty: 0 } );
    // }, []);

    const {removeItem, updateItem} = useCart()

    return (
        <div className="mt-4 text-xs text-gray-600 flex items-center">

            <button
                onClick = { 
                    () => { 
                        updateQty({ id: item.product.id.toString(), new_qty: 1 }) 
                        item.qty = (item.qty ?? 0) - 1;
                        updateItem(item.product.id, item.qty);

                        if (item.qty === 0) {
                            removeItem(item.product.id)
                        }
                    } 
                }

                style = {{ fontSize: '15px', marginRight: '10px' }}

                className="text-gray-700"
                disabled = {isLoading}
            >
                <Minus className="h-2.5 w-2.5 -mr-5 hover:text-red-700"/>
            </button>

            <span style={{ fontSize: '13px', margin: '0 10px' }}>
                {/* {item.qty} */}
                { isLoading ? (<Loader2 className='h-3 w-3 animate-spin mr-0 ml-0' />) : item.qty }
            </span>

            <button
                onClick = { 
                    () => {

                        if( isError ){
                            toast.error(`No quedan unidades de ${item.product.name} disponibles.`)
                        }
                        else{
                            updateQty({ id: item.product.id.toString(), new_qty: -1 }) 

                            if ( ( data?.product_qty ?? 1 ) > 0 && item.product.qty >= 1 ){
                                item.qty = (item.qty ?? 0) + 1;
                                updateItem(item.product.id, item.qty);
                            }
                        }

                    } 
                }

                style = {{ fontSize: '15px', marginRight: '10px' }}

                className="text-gray-700"
                disabled = {isLoading}
            >
                <Plus className="h-2.5 w-2.5 hover:text-green-700"/>
                {/* { isLoading ? 
                    (<Loader2 className='h-2.5 w-2.5 animate-spin mr-0 ml-0' />) 
                    : (<Plus className="h-2.5 w-2.5 hover:text-green-700"/>) 
                } */}
            </button>

        </div>
    );
};

export default QuantityController;
