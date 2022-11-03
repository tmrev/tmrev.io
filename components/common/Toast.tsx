// import clsx from 'clsx';
// import { AnimatePresence, motion } from 'framer-motion';
// import React, { FunctionComponent, useEffect } from 'react';

// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setOpenToast } from '../../redux/slice/toastSlice';
// import Button from './Button';

// const Toast:FunctionComponent = () => {
//   const { toastContent, toastOpen } = useAppSelector((state) => state.toast);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (toastOpen) {
//       setTimeout(() => {
//         dispatch(setOpenToast(false));
//       }, 1500);
//     }
//   }, [toastOpen]);

//   return (
//     <AnimatePresence>
//       {toastOpen && (
//         <motion.div
//           animate={{ opacity: 1, y: -5 }}
//           className={
//             clsx(
//               'bg-tmrev-gray-dark py-2 px-4 text-tmrev-alt-yellow rounded text-center',
//               'm-auto sticky min-w-[150px] w-max left-0 right-0 bottom-5 z-50',
//             )
//           }
//           exit={{ opacity: 0, y: 100 }}
//           initial={{ opacity: 0, y: -100 }}
//         >
//           <div className="flex items-center space-x-3">
//             <p className="text-tmrev-alt-yellow
// font-semibold tracking-widest uppercase">{toastContent}</p>
//             <Button
//               className="font-semibold"
//               variant="text"
//               onClick={() => dispatch(setOpenToast(false))}
//             >
//               Dismiss
//             </Button>
//           </div>

//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Toast;

export default 'test';
