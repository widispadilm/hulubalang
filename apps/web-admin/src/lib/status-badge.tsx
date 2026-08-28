const COLORS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  REQUESTED: 'bg-amber-100 text-amber-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  ASSIGNED: 'bg-blue-100 text-blue-800',
  VEHICLE_PICKED_UP: 'bg-indigo-100 text-indigo-800',
  IN_TRANSIT: 'bg-indigo-100 text-indigo-800',
  REPORTED_AT_POOL: 'bg-amber-100 text-amber-800',
  AT_POOL: 'bg-teal-100 text-teal-800',
  AT_ORIGIN_PORT: 'bg-teal-100 text-teal-800',
  ON_VESSEL: 'bg-teal-100 text-teal-800',
  AT_DESTINATION_PORT: 'bg-teal-100 text-teal-800',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  DELAY: 'bg-orange-100 text-orange-800',
  CANCELED: 'bg-slate-200 text-slate-700',
  CLAIM: 'bg-red-100 text-red-800',
  HOLD: 'bg-red-100 text-red-800',
  REPORTED: 'bg-amber-100 text-amber-800',
  VERIFIED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const LABELS: Record<string, string> = {
  PENDING: 'Menunggu Konfirmasi',
  REQUESTED: 'Diminta',
  CONFIRMED: 'Terkonfirmasi',
  ASSIGNED: 'Dijadwalkan',
  VEHICLE_PICKED_UP: 'Unit Diambil',
  IN_TRANSIT: 'Dalam Perjalanan',
  REPORTED_AT_POOL: 'Menunggu Verifikasi Pool',
  AT_POOL: 'Di Pool',
  AT_ORIGIN_PORT: 'Di Pelabuhan Asal',
  ON_VESSEL: 'Di Atas Kapal',
  AT_DESTINATION_PORT: 'Di Pelabuhan Tujuan',
  OUT_FOR_DELIVERY: 'Menuju Pengiriman',
  DELIVERED: 'Terkirim',
  DELAY: 'Delay',
  CANCELED: 'Dibatalkan',
  CLAIM: 'Klaim Asuransi',
  HOLD: 'Ditahan',
  REPORTED: 'Menunggu Verifikasi',
  VERIFIED: 'Terverifikasi',
  REJECTED: 'Ditolak',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[status] ?? 'bg-slate-100 text-slate-700'}`}>
      {LABELS[status] ?? status}
    </span>
  );
}
