import React from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationButtons";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";
import CollapsibleView from "./CollapsibleView";

/**
 * Dashboard component that manages the display of cryptocurrency data
 * across its components such as a chart, tables, and a grid.
 * It uses the DashboardContext for pagination and display settings,
 * and the CryptoDataContext for accessing the cryptocurrency data.
 * The component dynamically renders different views (Historical data, Watchlist,
 * and Browse Cryptocurrencies) using the CollapsibleView component.
 *
 * @component
 * @example
 * return <Dashboard />;
 * @returns {JSX.Element} The main dashboard view comprising collapsible sections
 * for historical data visualization, a watchlist table, a cryptocurrency browsing
 * table or grid, and pagination controls.
 */
const Dashboard = () => {
  // Accessing the pagination and display settings from the Dashboard context.
  const { page, changeCurrentPage, setPerPage } = useDashboard();

  // Accessing cryptocurrency data and configuration for tables from the CryptoData context.
  const {
    watchedCryptos,
    displayedCryptos,
    WatchlistTableConfig,
    BrowseTableConfig,
  } = useCryptoData();

  return (
    <div>
      {/* Historical data section with collapsible chart view */}
      <CollapsibleView
        title="Historical data"
        children={<CryptoChart cryptos={watchedCryptos} />}
      />
      {/* Watchlist section with collapsible table view */}
      <CollapsibleView title="Your Watchlist">
        {watchedCryptos.length === 0 ? (
          <p className="text-lg px-2 sm:px-8 font-extralight drop-shadow-lg">
            Nothing here, please add any cryptocurrency to watchlist.
          </p>
        ) : (
          <CryptoTable cryptos={watchedCryptos} config={WatchlistTableConfig} />
        )}
      </CollapsibleView>
      {/* Browse Cryptocurrencies section with collapsible table or grid view depending on screen size */}
      <CollapsibleView title="Browse Cryptocurrencies">
        <div className="hidden lg:visible md:visible md:flex sm:hidden">
          <CryptoTable cryptos={displayedCryptos} config={BrowseTableConfig} />
        </div>
        <div className="lg:hidden md:hidden">
          <CryptoGrid cryptos={displayedCryptos} config={BrowseTableConfig} />
        </div>
        {/* Pagination controls */}
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
