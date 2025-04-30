// import { PropsWithChildren, ReactNode } from "react";
// import { motion } from "motion/react"

// interface FadeProps {
//     duration?: number;
//     children: ReactNode
// }

// export const FadeVisible: React.FC<PropsWithChildren & FadeProps> = (
//     { duration = 3, children }): React.ReactNode => {
//     return (<motion.div
//         variants={ fadeVisibleVariant(duration) }
//         initial= "initial"
//         viewport = {{ once: true, amount: 0.5 }}
//         whileInView = "animate"
//         >
//         { children }
//         </motion.div>
//     )
// }
