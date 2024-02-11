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
    WatchlistTableConfig,
    BrowseTableConfig,
  } = useCryptoData();

  return (
    <div>
      <CollapsibleView
        title="Historical data"
        children={<CryptoChart cryptos={watchedCryptos} />}
      />
      <CollapsibleView title="Your Watchlist">
        {watchedCryptos.length === 0 ? (
          <p className="text-lg px-2 sm:px-8 font-extralight drop-shadow-lg">
            Nothing here, please add any cryptocurrency to watchlist.
          </p>
        ) : (
          <CryptoTable cryptos={watchedCryptos} config={WatchlistTableConfig}
          />
        )}
      </CollapsibleView>
      <CollapsibleView title="Browse Cryptocurrencies">
        <div className="hidden lg:visible md:visible md:flex sm:hidden">
          <CryptoTable cryptos={displayedCryptos} config={BrowseTableConfig}

          />
        </div>
        <div className="lg:hidden md:hidden">
          <CryptoGrid cryptos={displayedCryptos} config={BrowseTableConfig}
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
