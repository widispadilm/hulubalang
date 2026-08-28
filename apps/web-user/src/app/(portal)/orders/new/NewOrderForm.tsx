'use client';

import { useState, useTransition } from 'react';
import { createOrderAction, type VehicleInput } from './actions';

const EMPTY_VEHICLE: VehicleInput = {
  shipmentType: 'TOWING',
  vehicleBrand: '',
  vehicleModel: '',
  plateNumber: '',
  chassisNumber: '',
  engineNumber: '',
};

export function NewOrderForm() {
  const [pic, setPic] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [requestPickupDate, setRequestPickupDate] = useState('');
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [vehicles, setVehicles] = useState<VehicleInput[]>([{ ...EMPTY_VEHICLE }]);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function updateVehicle(index: number, patch: Partial<VehicleInput>) {
    setVehicles((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  function submit() {
    setError(undefined);
    startTransition(async () => {
      const result = await createOrderAction({ pic, originCity, destinationCity, requestPickupDate, specialInstruction, vehicles });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900">Detail Order</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama PIC</label>
            <input name="pic" value={pic} onChange={(e) => setPic(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tanggal Pickup Diminta</label>
            <input
              name="requestPickupDate"
              type="date"
              value={requestPickupDate}
              onChange={(e) => setRequestPickupDate(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Kota Asal</label>
            <input name="originCity" value={originCity} onChange={(e) => setOriginCity(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Kota Tujuan</label>
            <input name="destinationCity" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Catatan Khusus (opsional)</label>
            <input
              value={specialInstruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Instruksi tambahan untuk driver/operator..."
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Unit Kendaraan ({vehicles.length})</h2>
          <button
            type="button"
            onClick={() => setVehicles((prev) => [...prev, { ...EMPTY_VEHICLE }])}
            className="text-sm font-medium text-slate-700 underline"
          >
            + Tambah Unit
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {vehicles.map((v, i) => (
            <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Unit #{i + 1}</p>
                {vehicles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setVehicles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-xs font-medium text-red-600"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600">Jenis Pengiriman</label>
                  <select
                    data-testid={`shipmentType-${i}`}
                    value={v.shipmentType}
                    onChange={(e) => updateVehicle(i, { shipmentType: e.target.value as VehicleInput['shipmentType'] })}
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  >
                    <option value="TOWING">Towing</option>
                    <option value="SELF_DRIVE">Self Drive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Merek Mobil</label>
                  <input data-testid={`vehicleBrand-${i}`} value={v.vehicleBrand} onChange={(e) => updateVehicle(i, { vehicleBrand: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Jenis/Model Mobil</label>
                  <input data-testid={`vehicleModel-${i}`} value={v.vehicleModel} onChange={(e) => updateVehicle(i, { vehicleModel: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Plat Nomor</label>
                  <input data-testid={`plateNumber-${i}`} value={v.plateNumber} onChange={(e) => updateVehicle(i, { plateNumber: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Nomor Rangka</label>
                  <input data-testid={`chassisNumber-${i}`} value={v.chassisNumber} onChange={(e) => updateVehicle(i, { chassisNumber: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Nomor Mesin</label>
                  <input data-testid={`engineNumber-${i}`} value={v.engineNumber} onChange={(e) => updateVehicle(i, { engineNumber: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto"
      >
        {pending ? 'Mengirim Order...' : 'Kirim Order'}
      </button>
    </div>
  );
}
