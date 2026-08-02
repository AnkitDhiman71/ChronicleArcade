import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { slider2 } from '../API/slider2';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function Slider2() {
    const navigate = useNavigate();
    return (
        <div className="w-full py-6 px-4 sm:px-6 md:px-16 lg:px-24">
            <h1 className="text-white m-4 text-lg md:text-xl font-semibold">Top picks for you!</h1>
            <div className="max-w-6xl mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={16}
                    navigation
                    slidesPerView={1.2}
                    grabCursor
                    breakpoints={{
                        480: { slidesPerView: 1.5, spaceBetween: 16 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 4, spaceBetween: 24 }
                    }}
                >
                    {slider2.map((categorie) => (
                        <SwiperSlide
                            key={categorie.id}
                            className="h-auto cursor-pointer"
                            onClick={() => navigate(`/GameDetails/slider2?id=${categorie.id}`)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.05 }}
                                whileHover={{ scale: 0.97 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex h-full flex-col rounded-xl border border-cyan-400/20 bg-[#12121f] p-3 text-white shadow-lg"
                            >
                                <div className="w-full aspect-video overflow-hidden rounded-lg">
                                    <img
                                        src={categorie.image}
                                        alt={categorie.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <h3 className="mt-3 mb-1 text-base md:text-lg font-semibold line-clamp-1">
                                    {categorie.title}
                                </h3>

                                <p className="text-sm text-gray-300 line-clamp-2">
                                    {categorie.description}
                                </p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
