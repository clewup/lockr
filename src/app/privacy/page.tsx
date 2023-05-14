import Wrapper from '@/components/Wrapper/Wrapper';
import metadata from '@/constants/metadata';

export default function Privacy() {
    return (
        <Wrapper>
            <div className="flex flex-col gap-10">
                {metadata.policies.privacy.map((policy, index) => (
                    <div key={index}>
                        <h1 className="text-2xl font-bold">
                            {index + 1}. {policy.section}
                        </h1>
                        <p>{policy.content}</p>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}
