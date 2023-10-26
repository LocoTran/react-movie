import React, { useEffect, useState } from "react";
import { movieService } from "../../services/service";
import { ConfigProvider, Tabs } from "antd";
import moment from "moment/moment";
const onChange = (key) => {
    console.log(key);
};

export default function TheatherDesktop() {
    const [heThongRap, setHeThongRap] = useState([]);

    useEffect(() => {
        movieService
            .getMovieByTheather()
            .then((res) => {
                setHeThongRap(res.data.content);
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    }, []);

    let renderHeThongRap = () => {
        return heThongRap.map((heThong) => {
            return {
                key: heThong.maHeThongRap,
                label: <img className="w-16" src={heThong.logo} alt="" />,
                children: (
                    <Tabs
                        style={{
                            height: 500,
                        }}
                        tabPosition="left"
                        items={heThong.lstCumRap.map((cumRap) => {
                            return {
                                key: cumRap.tenCumRap,
                                label: (
                                    <div className="text-left w-96 whitespace-normal">
                                        <p>{cumRap.tenCumRap}</p>
                                        <p>{cumRap.diaChi}</p>
                                    </div>
                                ),
                                children: (
                                    <div
                                        style={{
                                            height: 500,
                                            overflowY: "scroll",
                                        }}
                                    >
                                        {renderDSPhim(cumRap)}
                                    </div>
                                ),
                            };
                        })}
                    />
                ),
            };
        });
    };

    let renderDSPhim = (cumRap) => {
        return cumRap.danhSachPhim.map((phim) => {
            return (
                <div
                    className="flex py-2 border-b-2 space-x-2"
                    key={phim.maPhim}
                >
                    <img
                        className="w-20 h-32 object-cover"
                        src={phim.hinhAnh}
                        alt=""
                        loading="lazy"
                    />
                    <div>
                        <h3 className="font-medium mb-2">{phim.tenPhim}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {phim.lstLichChieuTheoPhim
                                .slice(0, 9)
                                .map((lichChieu) => {
                                    return (
                                        <span className="rounded bg-red-500 px-2 py-1 text-white">
                                            {moment(
                                                lichChieu.ngayChieuGioChieu
                                            ).format("DD/MM/YY - hh:mm")}
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container py-20">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#F63E02",
                        borderRadius: 2,
                        colorBgContainer: "#fff",
                    },
                }}
            >
                <Tabs
                    style={{
                        height: 500,
                    }}
                    defaultActiveKey="1"
                    items={renderHeThongRap()}
                    tabPosition="left"
                    onChange={onChange}
                />
            </ConfigProvider>
        </div>
    );
}