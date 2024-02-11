import React from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationButtons";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";
import CollapsibleView from "./CollapsibleView";

const Dashboard = () => {
  const { page, changeCurrentPage, setPerPage } = useDashboard();
  const {
    watchedCryptos,
    displayedCryptos,
    toggleCryptoIsSelected,
    toggleAllCheckboxes,
    getCryptoPriceFormatted,
    toggleWatchedCryptoIsCharted,
  } = useCryptoData();

  return (
    <div>
      <CollapsibleView
        title="Historical data"
        children={<CryptoChart watchedCryptos={watchedCryptos} />}
      />
      <CollapsibleView title="Your Watchlist">
        {watchedCryptos.length === 0 ? (
          <p className="text-lg px-2 sm:px-8 font-extralight drop-shadow-lg">
            Nothing here, please add any cryptocurrency to watchlist.
          </p>
        ) : (
          <CryptoTable
            displayedCryptos={watchedCryptos}
            isShowingWatchedCryptos={true}
            toggleAllCheckboxes={toggleAllCheckboxes}
            toggleCryptoIsSelected={toggleCryptoIsSelected}
            getCryptoPriceFormatted={getCryptoPriceFormatted}
            toggleWatchedCryptoIsCharted={toggleWatchedCryptoIsCharted}
          />
        )}
      </CollapsibleView>
      <CollapsibleView title="Browse Cryptocurrencies">
        <div className="hidden lg:visible md:visible md:flex sm:hidden">
          <CryptoTable
            displayedCryptos={displayedCryptos}
            toggleAllCheckboxes={toggleAllCheckboxes}
            toggleCryptoIsSelected={toggleCryptoIsSelected}
            getCryptoPriceFormatted={getCryptoPriceFormatted}
          />
        </div>
        <div className="lg:hidden md:hidden">
          <CryptoGrid
            displayedCryptos={displayedCryptos}
            toggleAllCheckboxes={toggleAllCheckboxes}
            toggleCryptoIsSelected={toggleCryptoIsSelected}
            getCryptoPriceFormatted={getCryptoPriceFormatted}
          />
        </div>
        <PaginationFooter
          page={page}
          changeCurrentPage={changeCurrentPage}
          setPerPage={setPerPage}
        />
      </CollapsibleView>
    </div>
  );
};

export default Dashboard;
