export interface DataItemProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface DataListProps {
  data: DataItemProps[];
}

export interface LoadingBlockProps {
  text: string;
}
