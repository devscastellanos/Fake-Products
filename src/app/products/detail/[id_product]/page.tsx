"use client";
import { MainLayout } from "@/layouts";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/detailProduct";
import React, { useEffect, useState } from 'react';
import { FakeProduct } from '@/types/fakeProduct';

export default function ProductDetail() {
    const [product, setProduct] = useState<FakeProduct | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams();
    const { id_product } = params;

    function getProductFunc() {
        getProduct(id_product).then((res) => {
          console.log(res.data);
          setProduct(res.data);
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }

    useEffect(() => {
        getProductFunc();
    }, []); 

    console.log(id_product);
    
    return (
        <MainLayout>
            <div>
                {isLoading ? (
                    <p className="text-black">Cargando...</p>
                ) : (
                    product && (
                        <>
                            <div className=" grid grid-cols-2 gap-10  p-4 bg-indigo-700 rounded-lg shadow-lg"> 
                                <div className="relative w-50% h-4/6 md:w-[520px] md:h-[460px] overflow-hidden cursor-pointer shadow-lg bg-white ">
                                    <img src={product.image} alt={product.title} className="object-contain w-full h-full rounded-br-lg"/>
                                </div>
                            
                            <div className="flex flex-col items-start justify-center text-white tracking-[1px]">      
                                <h1 className="text-[30px] font-bold text-white">{product.title}</h1>
                                <h1>
                                    <br></br>
                                </h1>                
                                <span className="text-[20px]">ID: {product.id}</span>                
                                <span className="text-[20px]">Categoría: {product.category}</span>
                                <h1>
                                    <br></br>
                                </h1>                
                                <span className="text-black">{product.description}</span>
                                <h1><br></br></h1>
                                <span className="text-[25px] font-bold">${product.price}</span>
                                <span className="text-black">Rating: {product.rating.rate} ({product.rating.count} Reseñas)</span>
                            </div>
                            </div>
                        </>
                    )
                )}
            </div>
        </MainLayout>
    );
}
