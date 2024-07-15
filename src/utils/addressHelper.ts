export const minAddress = (address: string | undefined, number = 3) => {
  return address ? `${address.slice(0, number)}...${address.slice(number * -1)}` : 'Undefined';
};