interface Props {
  searchedName: string;
}
function Searched({ searchedName }: Props) {
  return (
    <>
      <li className='searched-item'>{searchedName}</li>
    </>
  );
}
export default Searched;
