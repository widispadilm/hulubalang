import { NewOrderForm } from './NewOrderForm';

export default function NewOrderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Buat Order Baru</h1>
      <p className="mt-1 text-sm text-slate-500">
        Lengkapi data pengiriman di bawah ini. Order akan diproses oleh tim Marketing kami setelah dikirim.
      </p>
      <div className="mt-6">
        <NewOrderForm />
      </div>
    </div>
  );
}
