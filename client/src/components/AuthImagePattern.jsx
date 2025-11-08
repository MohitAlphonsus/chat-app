export default function AuthImagePattern({ title, subtitle }) {
	return (
		<div className="hidden lg:flex items-center justify-center bg-base-200 p-12 ">
			<div className="max-w-md flex flex-col items-center text-center">
				<div className="grid grid-cols-3 gap-3 mb-8">
					{[...Array(9)].map((_, i) => (
						<div
							key={i}
							className={`size-24 aspect-square rounded-2xl bg-primary/10 ${
								i % 2 === 0 ? "animate-pulse" : ""
							}`}
						></div>
					))}
				</div>
				<h2 className="text-2xl font-bold mb-4 text-base-content/80">
					{title}
				</h2>
				<h2 className="text-base-content/60">{subtitle}</h2>
			</div>
		</div>
	);
}
