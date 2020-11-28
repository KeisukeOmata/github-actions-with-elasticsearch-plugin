export const FixedFooter: React.FC<{ children: React.ReactNode }> = ( props ) => {
  return (
    <>
      <div className="fixed-footer">
        {props.children}
      </div>
    </>
  );
};
