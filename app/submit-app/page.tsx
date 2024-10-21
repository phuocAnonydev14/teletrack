import { SubmitForm } from '@/app/submit-app/components/SubmitForm';

export default function SubmitAppPage() {
  return (
    <div className="flex flex-col items-center gap-5 bg-[#3A485680] p-4 text-center md:px-[120px] md:py-[50px]">
      <p className="text-[40px] font-bold">Add Your Bot And Channel</p>
      <SubmitForm />
    </div>
  );
}
