import React from 'react';
import { assets } from '../assets/assets';


const Add = () => {
    return (
        <form>

            <div>
                <p>upload image</p>
                <div className="flex gap-2">
                    <label className="w-20" htmlFor="image-1" className="custom-file-upload">
                        <img src={assets.upload_area} alt="Placeholder" />
                        <input id="image-1" type="file" hidden />
                    </label>
                    <label className="w-20" htmlFor="image-2" className="custom-file-upload">
                        <img src={assets.upload_area} alt="Placeholder" />
                        <input id="image-2" type="file" hidden />
                    </label>
                    <label className="w-20" htmlFor="image-3" className="custom-file-upload">
                        <img src={assets.upload_area} alt="Placeholder" />
                        <input id="image-3" type="file" hidden />
                    </label>
                    <label className="w-20" htmlFor="image-4" className="custom-file-upload">
                        <img src={assets.upload_area} alt="Placeholder" />
                        <input id="image-4" type="file" hidden />
                    </label>
                </div>
            </div>

        </form>
    );
};

export default Add;