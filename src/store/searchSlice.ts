import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import getTokenApi from "../api/monkeyGetToken";
import { useDebounce } from "../hooks/useDebounce";

export interface SearchCardState {
  searchList: Card[];
  searchName: string;
  searchType: string[];
  searchCompany: string[];
  searchBenefit: string[];
  isOpen: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: SearchCardState = {
  searchList: [],
  searchName: "",
  searchType: ["CREDIT", "CHECK"],
  searchCompany: [],
  searchBenefit: [],
  isOpen: true,
  status: "idle",
};

type UnionSearch = {
  selectedBenefit: string[];
  selectedCompany: string[];
  searchName: string;
};

const getBenefitCard = async (selectedBenefit: string[]) => {
  let index = 0;
  let benefitCards: Card[] = [];
  if (selectedBenefit.length === 0) {
    benefitCards = [];
    return benefitCards;
  }
  for (const benefit of selectedBenefit) {
    const data = await getTokenApi.searchByBenefit(benefit);
    if (index === 0) {
      benefitCards = data;
    } else {
      const newCardList = benefitCards.filter((card: Card) => {
        return data.find((item: Card) => item.id === card.id);
      });
      benefitCards = newCardList;
    }
    index++;
  }
  return benefitCards;
};

const getCompanyCard = async (selectedCompany: string[]) => {
  let companyCards: Card[] = [];
  if (selectedCompany.length === 0) {
    companyCards = [];
    return companyCards;
  }
  for (const company of selectedCompany) {
    const data = await getTokenApi.searchByCompany(company);
    companyCards.push(...data);
  }
  return companyCards;
};

const getNameCard = async (searchName: string) => {
  const data = await getTokenApi.searchByName(searchName);
  return data;
};

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (selected: UnionSearch) => {
    const benefitData = await getBenefitCard(selected.selectedBenefit);
    const companyData = await getCompanyCard(selected.selectedCompany);
    const nameData =
      selected.searchName !== "" ? await getNameCard(selected.searchName) : [];
    if (
      selected.selectedBenefit.length === 0 &&
      selected.selectedCompany.length === 0
    ) {
      return nameData;
    } else {
      if (selected.selectedBenefit.length === 0) {
        if (selected.searchName.length === 0) return companyData;
        const newCardList = companyData.filter((card: Card) => {
          return nameData.find((item: Card) => item.id === card.id);
        });
        return newCardList;
      }
      if (selected.selectedCompany.length === 0) {
        if (selected.searchName.length === 0) return benefitData;
        const newCardList = benefitData.filter((card: Card) => {
          return nameData.find((item: Card) => item.id === card.id);
        });
        return newCardList;
      }
      if (selected.searchName.length === 0) {
        const newCardList = benefitData.filter((card: Card) => {
          return companyData.find((item: Card) => item.id === card.id);
        });
        return newCardList;
      }
      const newCardList1 = benefitData.filter((card: Card) => {
        return companyData.find((item: Card) => item.id === card.id);
      });
      const newCardList2 = newCardList1.filter((card: Card) => {
        return nameData.find((item: Card) => item.id === card.id);
      });
      return newCardList2;
    }
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleSearchType(state, action: PayloadAction<string>) {
      if (state.searchType.includes(action.payload)) {
        state.searchType = state.searchType.filter(
          (item) => item != action.payload,
        );
      } else {
        state.searchType = [...state.searchType, action.payload];
      }
    },
    handleSearchBenefit(state, action: PayloadAction<string>) {
      if (state.searchBenefit.includes(action.payload)) {
        state.searchBenefit = state.searchBenefit.filter(
          (item) => item != action.payload,
        );
      } else {
        state.searchBenefit = [...state.searchBenefit, action.payload];
      }
    },
    handleSearchCompany(state, action: PayloadAction<string>) {
      if (state.searchCompany.includes(action.payload)) {
        state.searchCompany = state.searchCompany.filter(
          (item) => item != action.payload,
        );
      } else {
        state.searchCompany = [...state.searchCompany, action.payload];
      }
    },
    handleSearchName(state, action: PayloadAction<string>) {
      state.searchName = action.payload;
    },
    handleIsOpen(state) {
      state.isOpen = !state.isOpen;
    },
    resetSearch(state) {
      state.searchBenefit = [];
      state.searchCompany = [];
      state.searchType = ["CREDIT", "CHECK"];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) state.searchList = action.payload;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  handleSearchType,
  handleSearchBenefit,
  handleSearchCompany,
  handleSearchName,
  handleIsOpen,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
