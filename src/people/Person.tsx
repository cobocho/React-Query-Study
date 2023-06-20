export interface PersonType {
  name: string;
  hair_color: string;
  eye_color: string;
}

export function Person({ name, hair_color, eye_color }: PersonType) {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hair_color}</li>
        <li>eyes: {eye_color}</li>
      </ul>
    </li>
  );
}
