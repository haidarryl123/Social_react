
import { Outlet } from "react-router-dom";
import {Header} from "./Header";

const Main = () => {
    return (
        <>
            <div className="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed" style={{minHeight: '667px'}}>
                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper ml-0 p-0 mb-0 mt-5 d-flex align-items-center justify-content-center">
                        <section className="content w-100">
                            <div className="container-fluid pt-5">

                                <Outlet />

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Main};