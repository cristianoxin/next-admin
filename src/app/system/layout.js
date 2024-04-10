import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";

const SystemLayout = ({ children }) => {
	return (
		<div className="layout">
			<Header />
		    <div className="layout-container">
		        <div className="layout-sidebar">
		          <Sidebar />
		        </div>
		        <div className="layout-main">
		          {children}
		        </div>
		    </div>
		</div>
	)
}

export default SystemLayout;