export function LumaSpin() {
  return (
    <div className="relative aspect-square w-[65px]">
      <span className="animate-loaderAnim absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100" />
      <span className="animate-loaderAnim animation-delay absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100" />
    </div>
  );
}
