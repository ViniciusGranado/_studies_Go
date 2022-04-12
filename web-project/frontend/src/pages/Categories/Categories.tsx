interface CategoriesProps {
  title: string;
}

export const Categories: React.FC<CategoriesProps> = ({ title }) => {
  return (
    <h2>Category: {title}</h2>
  );
}