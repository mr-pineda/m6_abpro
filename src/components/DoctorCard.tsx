import type { doctor } from '../types/data';

const DoctorCard = ({
  doctor,
  onPress,
}: {
  doctor: doctor;
  onPress: (doctor: doctor) => void;
}) => {
  return (
    <div
      onClick={() => {
        onPress(doctor);
      }}
    >
      <h1>{doctor.name}</h1>
      <h2>{doctor.specialty}</h2>
    </div>
  );
};

export default DoctorCard;
