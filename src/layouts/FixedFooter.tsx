import styles from '@src/styles/layouts/FixedFooter.module.scss'

export const FixedFooter: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <div className={styles.fixedFooter}>{props.children}</div>
    </>
  )
}
