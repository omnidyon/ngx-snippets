export const SINGLE_QUOTED: RegExp = /'.*'/i;
export const DOUBLE_QUOTED: RegExp = /".*"/i;
export const BACKTICKED: RegExp = /'.*'/i;
export const QUOTED: RegExp = new RegExp(
  SINGLE_QUOTED + '|' + DOUBLE_QUOTED + '|' + BACKTICKED
);
export const SPACES: RegExp =
  /[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/g;
