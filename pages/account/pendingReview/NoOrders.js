import React from 'react';
import { Button } from "@material-tailwind/react";
import Link from 'next/link';

export default function NoOrders() {
    return (
        <div className="px-24 flex flex-col items-center">
            <img style={{paddingBottom: '20px'}} src="https://www.jumia.com.eg/assets_he/images/review.e9fae2f3.svg" height="100" width="100" alt="" />            
            <h1 style={{paddingBottom: '10px'}}>You have no orders waiting for feedback</h1>
            <p>
                After getting your products delivered, you will be able to rate and review them. Your feedback will be published on the product page to help all Jumia's users get the best shopping experience!
            </p>
            <Link href="/">
                <Button variant="filled" color="orange" className="w-full mt-5">CONTINUE SHOPPING</Button>
            </Link>
        </div>
    );
}
