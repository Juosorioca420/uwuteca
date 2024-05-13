'use client'

import { Checkbox } from '@/components/ui/checkbox';
import { trpc } from '../../trpc/client';
import { useState, Fragment } from 'react';
import { Button } from '../../components/ui/button';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import ProductReel from '../../components/ProductReel';
import { Dialog, Disclosure, Menu, Transition, TransitionChild, DialogPanel, MenuButton, DisclosureButton, DisclosurePanel, MenuItem, MenuItems } from '@headlessui/react'
import { Plus, X, Minus, ChevronDown, ListFilter, Search, CircleArrowDown, CircleArrowUp } from 'lucide-react'


const Products = () => {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { data: all_categories_raw } = trpc.getAllCategories.useQuery({ limit: 100 });
  const all_categories = all_categories_raw?.map(category => category.name);

  const [sort_price, setSortPrice] = useState('price');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => all_categories || []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen} as={Fragment}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4 mt-20">
                    <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Cerrar Menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categorias</h3>


                    <Disclosure as="div" key='categorias-movil' className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>

                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Categorias</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <Minus className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <Plus className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>

                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {all_categories?.map(category => (
                                <div key={category} className="flex items-center">
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

                                    className='h-4 w-4 rounded border-gray-300'
                                  />

                                  <label className="ml-3 text-sm text-gray-600">
                                    {category}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>

                        </>
                      )}
                    </Disclosure>

                    <Disclosure as="div" key='valores-movil' className="border-t border-gray-200 px-4 py-6" defaultOpen>
                      {({ open }) => (
                        <>

                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Valor</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <Minus className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <Plus className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>

                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">

                              <div key='precio-mayor' className="flex items-center">

                                <button onClick={() => setSortPrice('price')} >
                                  <CircleArrowUp className={`h-5 w-5 ${sort_price === 'price' ? 'text-blue-600' : 'text-gray-500'}`} />
                                </button>

                                <label className="ml-3 text-sm text-gray-600">
                                  Menor a Mayor
                                </label>
                              </div>

                              <div key='precio-menor' className="flex items-center">

                                <button onClick={() => setSortPrice('-price')} >
                                  <CircleArrowDown className={`h-5 w-5 ${sort_price === '-price' ? 'text-blue-600' : 'text-gray-500'}`} />
                                </button>

                                <label className="ml-3 text-sm text-gray-600">
                                  Mayor a Menor
                                </label>
                              </div>

                            </div>
                          </DisclosurePanel>

                        </>
                      )}
                    </Disclosure>
                  </div>

                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">

            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Catalogo</h1>


            <div className="flex items-center">

              {/* BARRITA DE BUSQUEDA */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <Search
                      className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Buscar...
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              {/* DESPLEGAR FILTROS EN PANTALLA PEQUEÑA */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <ListFilter className="h-5 w-5" aria-hidden="true" />
              </button>

            </div>
          </div>


          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="sr-only">Categorias</h3>

                <Disclosure as="div" key='categorias' className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>

                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Categorias</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>

                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {all_categories?.map(category => (
                            <div key={category} className="flex items-center">
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

                                className='h-4 w-4 rounded border-gray-300'
                              />

                              <label className="ml-3 text-sm text-gray-600">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>

                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" key='valores' className="border-b border-gray-200 py-6" defaultOpen>
                  {({ open }) => (
                    <>

                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Valor</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>

                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">

                          <div key='precio-mayor' className="flex items-center">

                            <button onClick={() => setSortPrice('price')} >
                              <CircleArrowUp className={`h-5 w-5 ${sort_price === 'price' ? 'text-blue-600' : 'text-gray-500'}`} />
                            </button>

                            <label className="ml-3 text-sm text-gray-600">
                              Menor a Mayor
                            </label>
                          </div>

                          <div key='precio-menor' className="flex items-center">

                            <button onClick={() => setSortPrice('-price')} >
                              <CircleArrowDown className={`h-5 w-5 ${sort_price === '-price' ? 'text-blue-600' : 'text-gray-500'}`} />
                            </button>

                            <label className="ml-3 text-sm text-gray-600">
                              Mayor a Menor
                            </label>
                          </div>

                        </div>
                      </DisclosurePanel>

                    </>
                  )}
                </Disclosure>

              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductReel
                  title=''
                  query={{
                    category: selectedCategories.length === 0 ? all_categories : selectedCategories,
                    limit: 12,
                    sort: sort_price as "price" | "-price",
                  }}
                />
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  )
  
}

export default Products;
