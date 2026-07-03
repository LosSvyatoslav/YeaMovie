export function formatMoney(amount) {
            if (amount == null) return 'Неизвестно';
            const millions = amount / 1_000_000;
            return Number.isInteger(millions)
            ? millions
            : millions.toFixed(1)
        }