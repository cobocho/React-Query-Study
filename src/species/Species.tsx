interface Props {
  name: string;
  language: string;
  averageLifespan: string;
}

export function Species({ name, language, averageLifespan }: Props) {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  );
}
