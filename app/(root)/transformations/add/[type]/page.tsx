import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import Header from "@/components/Header"
import TransformationForm from "@/components/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in")

    const user = await getUserById(userId);

    const transformation = transformationTypes[type];

    return (
        <>
            <Header
                title={transformation.title}
                subtitle={transformation.subTitle}
            />
            <section className="mt-10">
                <TransformationForm
                    action="Add"
                    userId={user._id}
                    type={transformation.type as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    )
}

export default AddTransformationTypePage