import PageWrapper from '@/components/PageWrapper/PageWrapper';
import metadata from '@/constants/metadata';

export default function Terms() {
    return (
        <PageWrapper>
            <div className="flex flex-col gap-10">
                <h1 className="text-5xl">Terms of Service</h1>

                {metadata.policies.tos.map((term, index) => (
                    <div key={index}>
                        <h1 className="text-2xl font-bold">
                            {index + 1}. {term.section}
                        </h1>
                        <p>{term.content}</p>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}
