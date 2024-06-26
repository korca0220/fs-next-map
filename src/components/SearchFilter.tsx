import { searchState } from "@/atom";
import { DISTRICT_ARR } from "@/data/store";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <div className="flex flex-col  md:flex-row gap-2 my-4 ">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          type="search"
          placeholder="음식점 검색"
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          className="block w-full p-3 text-gray-800 text-sm border-gray-300 rounded-lg border  focus:border-blue-500 outline-none focus:border-2 bg-gray-50"
        ></input>
      </div>
      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 w-full p-3 outline-none"
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((district, index) => (
          <option value={district} key={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}
