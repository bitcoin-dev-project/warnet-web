"use client";

import React, { useEffect, useState } from "react";
import { useAwardedPointsContext } from "@/contexts/awarded-points-context";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

type AdminForm = {
  isOpen: boolean;
  invalidReason: string | null;
}

const page = () => {
  const {
    points,
    stylePoints,
    updateStylePoints,
    savePoints
  } = useAwardedPointsContext();

  const [adminForm, setAdminForm] = useState<AdminForm>({
    isOpen: false,
    invalidReason: null,
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authKey = formData.get("auth-key");
    if (authKey) {
      const authKeyString = authKey as string;
      Cookies.set("auth-key", authKeyString);
      setAdminForm({isOpen: false, invalidReason: null});
    }
  };

  const closeAdminForm = () => {
    setAdminForm({isOpen: false, invalidReason: null});
  }

  const handleSavePoints = async () => {
    const result = await savePoints();
    const isUnauthorized = !result.success && result.unauthorized
    if (isUnauthorized) {
      setAdminForm({isOpen: true, invalidReason: "Invalid auth key"})
      return;
    }
    if (!result.success) {
      alert(result.message);
    }
    return;
  }

  useEffect(() => {
    const authKey = Cookies.get('auth-key');
    if (!authKey) {
      setAdminForm({isOpen: true, invalidReason: null})
    }
  }, [])

  return (
    <>
      {adminForm.isOpen && (
        <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 flex flex-col items-center"
        >
          <div className="absolute w-full h-full bg-black/50" onClick={closeAdminForm}></div>
          <div className="relative top-[30%] w-[400px] bg-gray-200 p-10 rounded-lg z-1 isolate">
            <form onSubmit={handleSubmitForm} className="flex flex-col gap-6 items-center">
              <p className="text-center text-2xl font-bold">Enter auth key</p>
              {adminForm.invalidReason && (
                <p className="text-center text-red-500">{adminForm.invalidReason}</p>
              )}
              <input
                name="auth-key"
                type="password"
                placeholder="auth key"
                autoComplete="new-password"
                required
                className="mt-[40px] w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-400 rounded-lg p-3"
              />
              <button
                type="submit"
                className="text-white font-medium disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed bg-gray-600 rounded-lg px-4 py-3 text-sm w-full max-w-[500px]"
              >
                Save Key
              </button>
            </form>
          </div>
        </div>
      )}
      <div
        className={`text-black flex flex-col px-[100px] py-20 pt-[10%] }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <h2 className="font-medium text-5xl text-white">
            Award Style Points
          </h2>
          <div className="flex flex-col gap-6 h-full w-full max-w-[500px]">
            <div className="flex flex-col gap-6 w-full items-center">
              <section className="w-full">
                {Object.entries(points).map(([key, value], index) => (
                  <div
                    key={`${key}-${index}`}
                    className="flex justify-between items-center gap-2"
                  >
                    <p className="text-xl font-medium text-white capitalize">
                      {key}
                    </p>
                    <p className="text-xl font-medium text-white">{value}</p>
                  </div>
                ))}
              </section>
              <section className="w-full max-w-[500px] flex flex-col gap-3">
                <select
                  name=""
                  id=""
                  className="p-3 rounded-md text-white border border-gray-500 w-full bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  onChange={(e) =>
                    updateStylePoints({ type: "name", value: e.target.value })
                  }
                  value={stylePoints.name}
                  required
                >
                  <option value="">Select a team</option>
                  {Object.keys(points).map((key, index) => (
                    <option key={`${key}-${index}`} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  className="p-3 rounded-lg text-white border border-gray-500 w-full bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  onChange={(e) =>
                    updateStylePoints({
                      type: "score",
                      value: Number(e.target.value) ?? 0,
                    })
                  }
                  value={stylePoints.score || ""}
                  placeholder="style points to award"
                  required
                />
                {stylePoints.name && stylePoints.score && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <label htmlFor="points-reason" className="text-gray-200">
                      Reason:
                    </label>
                    <input
                      type="text"
                      id="points-reason"
                      className="p-3 rounded-lg text-white border border-gray-500 w-full bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onChange={(e) =>
                        updateStylePoints({
                          type: "reason",
                          value: e.target.value,
                        })
                      }
                      value={stylePoints.reason}
                    />
                  </motion.div>
                )}
              </section>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => handleSavePoints()}
            disabled={!stylePoints.name || !stylePoints.score}
            className="text-white disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed bg-brand-purple rounded-lg px-4 py-3 text-sm w-full max-w-[500px] "
          >
            Award points
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
