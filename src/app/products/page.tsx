'use client'


import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { trpc } from '../../trpc/client';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { Product } from '../../payload-types';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import ProductReel from '../../components/ProductReel';

const Products = () => {
    const { data: all_categories_raw } = trpc.getAllCategories.useQuery({ limit: 100 });
    const all_categories = all_categories_raw?.map(category => category.name);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sort_price, setSortPrice] = useState('price');

    const [selectedCategories, setSelectedCategories] = useState<string[]>(() => all_categories || []);

    // const { data: items, isLoading, refetch } = trpc.getMainProducts.useInfiniteQuery(
    //     {
    //         limit: 100,
    //         query: {
    //             sort: sort_price as "price" | "-price",
    //             limit: 100,
    //             category: selectedCategories,
    //         }
    //     },

    //     { getNextPageParam: (lastPage) => lastPage.nextPage, },

    // )

    // const [productsList, setProductsList] = useState<(Product | null)[]>([]);

    // useEffect(() => {
    //     const products = items?.pages.flatMap((page) => page.items);
    //     let products_map: (Product | null)[] = [];

    //     if (products && products.length > 0) {
    //         products_map = products;
    //     } else if (isLoading) {
    //         products_map = new Array<null>(100).fill(null);
    //     }

    //     setProductsList(products_map);
    //     console.log(productsList);
    // }, [items, isLoading]);

    // useEffect(() => {
    //     refetch();
    // }, [sort_price, selectedCategories]);

    // let ejemplo = productsList[0]?.name

    return (
        <>

            <div>
                <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)} variant='link'>
                    {isDropdownOpen ? 'Categorias ↑' : 'Categorias ↓'}
                </Button>
                {isDropdownOpen && all_categories?.map(category => (
                    <div className='flex'>

                        <Checkbox
                            checked={selectedCategories?.includes(category) ?? false}

                            onCheckedChange={() => {
                                if (selectedCategories?.includes(category)) {
                                    // Si la categoría ya está en la lista, la eliminamos
                                    setSelectedCategories(selectedCategories?.filter(cat => cat !== category) ?? []);
                                } else {
                                    // Si la categoría no está en la lista, la añadimos
                                    setSelectedCategories([...(selectedCategories ?? []), category]);
                                }
                            }}

                        />
                        <label>{category}</label>

                    </div>
                ))}

            </div>


            <div>

                <Button
                    size='sm'
                    variant={sort_price === 'price' ? 'default' : 'ghost'}
                    onClick={() => setSortPrice('price')}
                >
                    <CircleArrowUp className={`h-5 w-5 ${sort_price === 'price' ? 'text-white' : 'text-blue-600'}`} />
                </Button>

                <Button
                    size='sm'
                    variant={sort_price === '-price' ? 'default' : 'ghost'}
                    onClick={() => setSortPrice('-price')}
                >
                    <CircleArrowDown className={`h-5 w-5 ${sort_price === '-price' ? 'text-white' : 'text-blue-600'}`} />
                </Button>


            </div>

            <div>{selectedCategories}</div>
            <div>{sort_price}</div>

            <MaxWidthWrapper>
                <ProductReel
                    title=''
                    query={{
                        category: selectedCategories.length === 0 ? all_categories : selectedCategories,
                        limit: 12,
                        sort: sort_price as "price" | "-price",
                    }}
                />
            </MaxWidthWrapper>

        </>
    );
};

export default Products;
