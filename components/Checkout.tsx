"use client";

import { useEffect } from "react";

import { checkoutCredits } from "@/lib/actions/transaction.actions";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
}: {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}) => {
    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast.success("Order placed!", {
                description: "You will receive an email confirmation",
            });
        }

        if (query.get("canceled")) {
            toast.error("Order canceled!", {
                description: "Continue to shop around and checkout when you're ready",
            });
        }
    }, []);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };

    return (
        <form action={onCheckout} method="POST">
            <section>
                <Button
                    type="submit"
                    role="link"
                    className="w-full rounded-sm cursor-pointer bg-purple-500 hover:bg-purple-500"
                >
                    Buy Credit
                </Button>
            </section>
        </form>
    );
};

export default Checkout;